import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { MenuItem } from "../entities/MenuItem";

export class MenuItemController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const menuItemRepository = AppDataSource.getRepository(MenuItem);
      const items = await menuItemRepository.find();
      
      res.status(200).json({
        success: true,
        message: "Menu items fetched successfully",
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }
}
