"use client";

import {
  CreditCardIcon,
  JoystickIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  FolderOpenIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/app/features/subscriptions/hooks/use-subscription";
import Logo from "./logo";
import { cn } from "@/lib/utils"; // ✅ From shadcn or your utils folder

const menuItems = [
  {
    title: "Workflows",
    url: "/workflows",
    icon: FolderOpenIcon,
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: KeyIcon,
  },
  {
    title: "Executions",
    url: "/executions",
    icon: JoystickIcon,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { hasActiveSubscription } = useHasActiveSubscription();

  return (
    <Sidebar collapsible="icon">
      {/* ---------- Header ---------- */}
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          className="gap-x-2 h-12 px-4 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
        >
          <Link href="/workflows" prefetch>
            <span className="inline-flex items-center justify-center">
              <Logo className="size-8 text-primary transition-transform duration-200 group-hover:scale-110" />
            </span>
            <span className="text-sm font-semibold">zynqNode</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* ---------- Menu Items ---------- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((menuItem) => {
                const isActive =
                  menuItem.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(menuItem.url);

                return (
                  <SidebarMenuItem key={menuItem.title}>
                    <SidebarMenuButton
                      tooltip={menuItem.title}
                      asChild
                      className={cn(
                        "group gap-x-4 h-10 px-4 rounded-md transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary active:scale-[0.98]",
                        isActive
                          ? "bg-primary/15 text-primary font-semibold shadow-sm"
                          : "text-muted-foreground"
                      )}
                    >
                      <Link href={menuItem.url} prefetch>
                        <menuItem.icon
                          className={cn(
                            "size-4 transition-transform duration-200 group-hover:scale-110",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span>{menuItem.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------- Footer ---------- */}
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                asChild
                className="group gap-x-4 h-10 px-4 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
                onClick={() => authClient.checkout({ slug: "pro" })}
              >
                <Link href="/" prefetch>
                  <StarIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>Upgrade to Pro</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={
                hasActiveSubscription ? "View Billing" : "Upgrade to Pro"
              }
              asChild
              className="group gap-x-4 h-10 px-4 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
              onClick={() => authClient.customer.portal()}
            >
              <Link href="/" prefetch>
                <CreditCardIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>Billing Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              asChild
              className="group gap-x-4 h-10 px-4 rounded-md transition-all duration-200 hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <Link href="/login" prefetch>
                <LogOutIcon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
