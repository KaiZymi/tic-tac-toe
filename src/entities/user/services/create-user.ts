import { userRepository } from "@/entities/user/repositories/user";
import { left, right } from "@/shared/lib/either";
import { passwordService } from "@/entities/user/services/password";
import { DEFAULT_RATING } from "@/entities/user/domain";
import cuid from "cuid";

export async function createUser  ({login, password}: {login:string, password:string}){

  const userWithLogin =  await userRepository.getUser({login})

  if (userWithLogin){
    return left('user-login-exists' as const)
  }

   const { hash, salt } = await passwordService.hashPassword(password);

   const user = userRepository.saveUser({
    id: cuid(),
    login,
    passwordHash: hash,
    salt,
    rating: DEFAULT_RATING,
  })

  return right(user)
}