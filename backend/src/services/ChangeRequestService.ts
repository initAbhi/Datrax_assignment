import { AppDataSource } from "../config/data-source";
import { ChangeRequest, RequestStatus } from "../entities/ChangeRequest";
import { MenuItem } from "../entities/MenuItem";
import { AppError } from "../errors/AppError";

export class ChangeRequestService {
  private changeRequestRepository = AppDataSource.getRepository(ChangeRequest);
  private menuItemRepository = AppDataSource.getRepository(MenuItem);

  private async generateRequestNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    // Find the latest request number for the current month
    const prefix = `CR-${year}${month}-`;
    const lastRequest = await this.changeRequestRepository
      .createQueryBuilder("cr")
      .where("cr.requestNumber LIKE :prefix", { prefix: `${prefix}%` })
      .orderBy("cr.requestNumber", "DESC")
      .getOne();

    let nextNumber = 1;
    if (lastRequest) {
      const lastSeq = parseInt(lastRequest.requestNumber.split("-")[2], 10);
      nextNumber = lastSeq + 1;
    }

    return `${prefix}${nextNumber.toString().padStart(4, '0')}`;
  }

  async create(data: Partial<ChangeRequest>, userId: string) {
    const item = await this.menuItemRepository.findOne({ where: { id: data.itemId } });
    if (!item) {
      throw new AppError("Menu item not found", 404);
    }

    const requestNumber = await this.generateRequestNumber();

    const changeRequest = this.changeRequestRepository.create({
      ...data,
      requestNumber,
      createdById: userId,
      status: RequestStatus.PENDING,
    });

    return await this.changeRequestRepository.save(changeRequest);
  }

  async findAllManagerRequests(userId: string) {
    return await this.changeRequestRepository.find({
      where: { createdById: userId },
      relations: { item: true, createdBy: true, approvedBy: true },
      order: { createdAt: "DESC" },
    });
  }

  async findAllPending() {
    return await this.changeRequestRepository.find({
      where: { status: RequestStatus.PENDING },
      relations: { item: true, createdBy: true },
      order: { createdAt: "ASC" },
    });
  }

  async findAllApproved() {
    return await this.changeRequestRepository.find({
      where: { status: RequestStatus.APPROVED },
      relations: { item: true, createdBy: true, approvedBy: true },
      order: { approvedAt: "DESC" },
    });
  }

  async getDetails(id: string) {
    const request = await this.changeRequestRepository.findOne({
      where: { id },
      relations: { item: true, createdBy: true, approvedBy: true },
    });

    if (!request) {
      throw new AppError("Change request not found", 404);
    }

    return request;
  }

  async updateStatus(id: string, status: RequestStatus, supervisorId: string) {
    const request = await this.changeRequestRepository.findOne({
      where: { id },
      relations: { item: true },
    });

    if (!request) {
      throw new AppError("Change request not found", 404);
    }

    if (request.status !== RequestStatus.PENDING) {
      throw new AppError(`Request is already ${request.status}`, 400);
    }

    request.status = status;
    request.approvedById = supervisorId;
    
    if (status === RequestStatus.APPROVED) {
      request.approvedAt = new Date();
      // Apply the change to the menu item immediately if approved
      if (request.changeType === "PRICE_UPDATE") {
        request.item.currentPrice = parseFloat(request.newValue);
      } else if (request.changeType === "AVAILABILITY_UPDATE") {
        request.item.currentAvailability = request.newValue === "true";
      } else if (request.changeType === "DESCRIPTION_UPDATE") {
        request.item.description = request.newValue;
      }
      await this.menuItemRepository.save(request.item);
    }

    return await this.changeRequestRepository.save(request);
  }
}
