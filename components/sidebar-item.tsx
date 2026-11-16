"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
  label: string;
  iconSrc: string;
  href: string;
  roundedIcon?: boolean;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
  roundedIcon = false,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="h-[52px] justify-start"
      asChild
    >
      <Link href={href} prefetch>
        <Image
          src={iconSrc}
          alt={label}
          className={cn(
            "mr-5 h-8 w-8 shrink-0 object-contain",
            roundedIcon && "rounded-full border border-slate-200 object-cover"
          )}
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
