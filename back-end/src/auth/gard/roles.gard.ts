import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGard } from '../gard/jwt-auth.gard'; // ใช้ JwtAuthGuard ในการตรวจสอบ JWT
import { Role } from '../roles/role.enum'; // Role Enum ที่ใช้ในระบบ
import { ROLES_KEY } from '../roles.decorator'; // เชื่อมกับ Decorator

@Injectable()
export class RolesGuard extends JwtAuthGard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true; // ถ้าไม่กำหนด role อนุญาตให้เข้าถึง
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // ข้อมูลจาก JWT Payload
    return roles.some((role) => user.role?.includes(role)); // ตรวจสอบ role
  }
}
