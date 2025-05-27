import { FileText } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Clock } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { FileEdit } from "lucide-react";
import { PhoneCall } from "lucide-react";

const sidebardata = [
  {
    title: "Header",
    icon: <FileText size={16} />,
    link: "/header",
  },
  {
    title: "Story",
    icon: <BookOpen size={16} />,
    link: "/story",
  },
  {
    title: "Timeline",
    icon: <Clock size={16} />,
    link: "/timeline",
  },
  {
    title: "Products",
    icon: <ShoppingBag size={16} />,
    link: "/products",
  },
  {
    title: "Blog",
    icon: <FileEdit size={16} />,
    link: "/blog",
  },
  {
    title: "Contact",
    icon: <PhoneCall size={16} />,
    link: "/contact",
  },
];

export default sidebardata; 