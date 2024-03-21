import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth"

export function mainMiddleware(req: NextRequest) {
    // const isLogin = true;
    // if (!isLogin) {
    //     return NextResponse.next();
    // } else {
    //     return NextResponse.redirect(new URL('/auth/login', req.url));
    // }
    const res = NextResponse.next();
    return res;
}

// export const config = {
//     matcher: ['/product', '/product/'],
// }

export default withAuth(mainMiddleware, ['/profile']);