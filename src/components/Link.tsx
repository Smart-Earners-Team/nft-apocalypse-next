// viewed
import React from "react";
import Link  from "next/link";
import cls from "classnames";

type LinkProps = {
  as?: "button";
  variant?: "primary" | "outline";
};

export default function Links({
  children,
  href,
  // activeClassName,
  // partiallyActive,
  className,
  as,
  variant = "primary",
  ...other
}: React.ComponentPropsWithoutRef<typeof Link> & LinkProps) {
  const internal = /^\/(?!\/)/.test(href.toString());
  let linkClassName = as === "button" ? "btn" : "hover:underline cursor-pointer focus-within:underline";
  if (as === "button") {
    if (variant === "primary") {
      linkClassName += " btn-primary";
    } else if (variant === "outline") {
      linkClassName += " btn-outline";
    }
  }

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <Link
        href={href}
        className={cls(linkClassName, className)}
        // activeClassName={activeClassName}
        // partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </Link>
    );
  }
  return (
    <a href={href.toString()} className={cls(linkClassName, className)} target="_blank" {...other}>
      {children}
    </a>
  );
}
