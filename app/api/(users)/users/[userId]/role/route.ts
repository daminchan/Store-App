// // src/app/api/users/[userId]/role/route.ts

// import { clerkClient } from '@clerk/nextjs'
// import { auth } from '@clerk/nextjs'
// import { type UserRoleType } from '@/types'
// import { NextResponse } from 'next/server'

// export async function PUT(
//   request: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const { userId } = auth()

//     // 認証チェック
//     if (!userId) {
//       return new NextResponse('Unauthorized', { status: 401 })
//     }

//     // 自分自身のデータのみ更新可能
//     if (userId !== params.userId) {
//       return new NextResponse('Forbidden', { status: 403 })
//     }

//     const { role } = (await request.json()) as { role: UserRoleType }

//     // roleの値をバリデーション
//     if (!['store_owner', 'customer'].includes(role)) {
//       return new NextResponse('Invalid role', { status: 400 })
//     }

//     // ユーザーのメタデータを更新
//     await clerkClient.users.updateUser(userId, {
//       publicMetadata: { role },
//     })

//     return new NextResponse(null, { status: 204 })
//   } catch (error) {
//     console.error('Failed to update user role:', error)
//     return new NextResponse('Internal Server Error', { status: 500 })
//   }
// }
