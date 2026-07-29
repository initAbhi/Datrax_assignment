import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import { comparePassword, signToken } from "../utils/auth";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);
    
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = signToken(user.id, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
