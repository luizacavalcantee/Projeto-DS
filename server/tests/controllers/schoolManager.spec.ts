import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { SchoolManager, Challenge, TeachingStage } from '@prisma/client'; 
import { SchoolManagerController } from '../../src/controllers'; 
import { SchoolManagerRepository } from '../../src/repositories';

jest.mock('@repositories', () => ({
  SchoolManagerRepository: {
    findByEmail: jest.fn(),
    findByInepCode: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

const mockedRepo = SchoolManagerRepository as jest.Mocked<typeof SchoolManagerRepository>;
const mockedHash = hash as jest.Mock;

type MockManagerWithChallenges = SchoolManager & { schoolChallenges: Challenge[] };

const mockManager: MockManagerWithChallenges = {
  id: 1,
  fullName: 'Gestor Mock da Silva',
  email: 'mock.gestor@example.com',
  password: 'hashedPassword',
  inepCode: '87654321',
  schoolName: 'Escola de Testes',
  cep: '12345678',
  address: 'Rua dos Testes',
  addressNumber: '123',
  phoneNumber: '11987654321',
  schoolImageUrl: 'http://example.com/image.png',
  addressComplement: null,
  teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_I],
  schoolChallenges: [],
};

describe('SchoolManagerController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      body: {
        fullName: 'João da Silva',
        email: 'joao.silva@example.com',
        password: 'password123',
        inepCode: '12345678',
        schoolName: 'Escola do João',
        cep: '87654321',
        address: 'Rua Nova',
        addressNumber: '10',
        teachingStages: [TeachingStage.ENSINO_MEDIO],
      },
    };
    mockResponse = {
      locals: {},
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new school manager successfully', async () => {
      mockedRepo.findByEmail.mockResolvedValue(null);
      mockedRepo.findByInepCode.mockResolvedValue(null);
      mockedHash.mockResolvedValue('hashedPassword');
      mockedRepo.create.mockResolvedValue(mockManager);

      await SchoolManagerController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockedRepo.findByEmail).toHaveBeenCalledWith('joao.silva@example.com');
      expect(mockedRepo.findByInepCode).toHaveBeenCalledWith('12345678');
      expect(mockedHash).toHaveBeenCalledWith('password123', 8);
      expect(mockedRepo.create).toHaveBeenCalledWith({
        ...mockRequest.body,
        password: 'hashedPassword',
      });
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.locals).toEqual({
        status: 201,
        message: 'Gestor escolar criado com sucesso',
        data: mockManager,
      });
    });

    it('should return a 400 error if email already exists', async () => {
      mockedRepo.findByEmail.mockResolvedValue(mockManager);

      await SchoolManagerController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      
      expect(mockedRepo.create).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: 400,
        message: 'Este e-mail já está cadastrado',
      });
    });

    it('should return a 400 error if INEP code already exists', async () => {
      mockedRepo.findByEmail.mockResolvedValue(null);
      mockedRepo.findByInepCode.mockResolvedValue(mockManager);

      await SchoolManagerController.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );
      
      expect(mockedRepo.create).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith({
        status: 400,
        message: 'Este código INEP já está cadastrado',
      });
    });
  });
});
