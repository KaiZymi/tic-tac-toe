import { UserEntity } from "@/entities/user/domain";
import { prisma } from "@/shared/lib/db";
import { Prisma } from "@prisma/client";


export function saveUser(user: UserEntity): Promise<UserEntity> {

  //upsert когда у нас нет мы создаём, когда есть обновляем
  return prisma.user.upsert({
    where: {
      id: user.id
    },
    create: user,
    update: user
  });
}

export function getUser(where: Prisma.UserWhereInput) {
  return prisma.user.findFirst({ where });
}

export const userRepository = {saveUser, getUser};