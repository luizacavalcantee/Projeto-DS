import jwt from 'jsonwebtoken';

// Definindo uma interface para o payload para manter a consistência e a tipagem forte.
// Este payload agora contém o ID e o tipo do usuário ('ong' ou 'manager').
export interface ITokenPayload {
  id: number;
  type: 'ong' | 'manager';
}

class TokenRepository {
  /**
   * Gera um Access Token.
   * @param payload - O objeto contendo id e type do usuário.
   * @param expiresIn - O tempo de expiração (ex: '60s', '15m').
   */
  generateAccessToken(payload: ITokenPayload, expiresIn: string) {
    const generatedToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn,
    });
    return generatedToken;
  }

  /**
   * Gera um Refresh Token.
   * @param payload - O objeto contendo id e type do usuário.
   * @param expiresIn - O tempo de expiração (ex: '5d', '7d').
   */
  generateRefreshToken(payload: ITokenPayload, expiresIn: string) {
    const generatedToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn,
    });
    return generatedToken;
  }

  /**
   * Verifica a validade de um Access Token.
   * @param token - O token a ser verificado.
   * @returns O payload decodificado contendo id and type.
   */
  verifyAccessToken(token: string): ITokenPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as ITokenPayload;
    return verifiedToken;
  }

  /**
   * Verifica a validade de um Refresh Token.
   * @param token - O token a ser verificado.
   * @returns O payload decodificado contendo id and type.
   */
  verifyRefreshToken(token: string): ITokenPayload {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as ITokenPayload;
    return verifiedToken;
  }
}

export default new TokenRepository();
