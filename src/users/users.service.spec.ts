import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        SequelizeModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return users', async () => {
      const result = await service.getUsers();
      expect(result).toBeDefined();
      expect(result.every((user) => user instanceof User)).toBe(true);
    });

    // it('should return a user', async () => {
    //   const result = await service.getUser('1');
    //   expect(result).toBeDefined();
    //   expect(result instanceof User).toBe(true);
    // });

    // it('should return undefined', async () => {
    //   const result = await service.getUser('123456789');
    //   expect(result).toBeNull();
    // });
  });
});
