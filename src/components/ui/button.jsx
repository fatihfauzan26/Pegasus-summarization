import * as React from "react" //Mengimpor semua fitur dari React agar kita bisa menggunakan fitur seperti forwardRef.
import { Slot } from "@radix-ui/react-slot" //Slot digunakan agar Button bisa mewarisi elemen lain sebagai child-nya
import { cva } from "class-variance-authority"; //utility untuk mengatur variasi class CSS berdasarkan props.

import { cn } from "@/lib/utils" //cn adalah helper untuk menggabungkan beberapa class CSS dengan kondisi tertentu.

const buttonVariants = cva( //cva() digunakan untuk mengelola variasi class CSS berdasarkan props.
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", //Latar belakang warna utama dengan teks warna utama.
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", //Warna merah untuk aksi berbahaya.
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", //Tombol tanpa latar belakang, hanya border.
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", //Warna sekunder.
        ghost: "hover:bg-accent hover:text-accent-foreground", //Tanpa border, hanya efek hover.
        link: "text-primary underline-offset-4 hover:underline", //Tombol terlihat seperti link teks.
      },
      size: { //ukuran tombol
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { // mengatur nilai default (variant: "default", size: "default").
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => { //Memungkinkan komponen menerima ref, sehingga bisa diakses dari luar, misalnya untuk fokus atau animasi.

  const Comp = asChild ? Slot : "button" //Jika asChild bernilai true, maka komponen akan menjadi Slot (elemen lain yang mewarisi tombol ini).
  //Jika false, tombol tetap menjadi elemen <button>.
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))} //untuk mengatur class.
      ref={ref} //agar bisa digunakan dengan forwardRef.
      {...props} />) //meneruskan semua props lain yang diberikan ke elemen tombol.
  );
})
Button.displayName = "Button" //Menetapkan displayName untuk debugging dan meningkatkan keterbacaan kode.

export { Button, buttonVariants } //Button → Mengekspor komponen tombol utama.
// buttonVariants → Mengekspor konfigurasi buttonVariants agar bisa digunakan di bagian lain aplikasi.
