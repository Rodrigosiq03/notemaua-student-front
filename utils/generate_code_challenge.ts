import * as Random from 'expo-random';
import { fromByteArray } from 'base64-js';
import * as Crypto from 'expo-crypto';

// Gera um code_verifier aleatório
export const generateCodeVerifier = (): string => {
    const randomBytes = Random.getRandomBytes(32); // Gera 32 bytes de dados aleatórios
    return fromByteArray(randomBytes)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Remove caracteres inválidos para URL
};

// Gera um code_challenge baseado no code_verifier
export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        codeVerifier,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    return hashed
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Remove caracteres inválidos para URL
};
