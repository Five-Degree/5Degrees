import { Avatar } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import Image from "next/image";

export default function UserAvatar({
  avatar,
  name,
}: {
  avatar: string | null | undefined;
  name: string | null | undefined;
}) {
  return avatar ? (
    <Avatar>
      <Image alt="User Avatar" src={avatar} width={25} height={25} />
    </Avatar>
  ) : name ? (
    <Avatar {...stringAvatar(name)} />
  ) : (
    <Avatar />
  );
}
