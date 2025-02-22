import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    getUser: jest.fn(),
    postUser: jest.fn(),
    putUser: jest.fn(),
    patchUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return params', async () => {
    mockUsersService.getUser.mockReturnValue('Mr Among Us');
    mockUsersService.postUser.mockReturnValue({ what: '?uestion mark' });
    mockUsersService.putUser.mockReturnValue({ what: '?uestion mark2' });
    mockUsersService.patchUser.mockReturnValue({ what: '?uestion mark3' });

    const result = await controller.getUser('1');
    const resultPost = await controller.postUser('asdf');
    const resultPut = await controller.putUser('ghij');
    const resultPatch = await controller.patchUser('klmn');

    expect(usersService.getUser).toHaveBeenCalledWith('1');
    expect(usersService.postUser).toHaveBeenCalledWith('asdf');
    expect(usersService.putUser).toHaveBeenCalledWith('ghij');
    expect(usersService.patchUser).toHaveBeenCalledWith('klmn');

    expect(result).toEqual('Mr Among Us');
    expect(resultPost).toEqual({ what: '?uestion mark' });
    expect(resultPut).toEqual({ what: '?uestion mark2' });
    expect(resultPatch).toEqual({ what: '?uestion mark3' });
  });
});
