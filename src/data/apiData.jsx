import { FileText } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Clock } from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { FileEdit } from "lucide-react";
import { PhoneCall } from "lucide-react";

const sidebardata = [
  {
    title: "Гарчиг",
    icon: <FileText size={16} />,
    link: "/header",
  },
  {
    title: "Түүх",
    icon: <BookOpen size={16} />,
    link: "/story",
  },
  {
    title: "Цаг Хугацаа",
    icon: <Clock size={16} />,
    link: "/timeline",
  },
  {
    title: "Бүтээгдэхүүн",
    icon: <ShoppingBag size={16} />,
    link: "/products",
  },
  {
    title: "Блог",
    icon: <FileEdit size={16} />,
    link: "/blog",
  },
  {
    title: "Холбоо Барих",
    icon: <PhoneCall size={16} />,
    link: "/contact",
  },
];

export default sidebardata; 
