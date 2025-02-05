import * as React from "react" //Mengimpor semua fitur dari React sehingga bisa menggunakan React di dalam file ini
import { cva } from "class-variance-authority"; //sebuah fungsi yang memungkinkan untuk mudah mengelola varian class CSS secara dinamis.

import { cn } from "@/lib/utils" //Mengimpor fungsi cn dari file utils

const badgeVariants = cva( //fungsi yang memungkinkan untuk membuat varian dinamis dari class CSS yang dapat disesuaikan
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: { // objek yang mendefinisikan varian badge yang berbeda
      variant: {
        default: //Badge dengan latar belakang utama dan teks utama.
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: //Badge dengan latar belakang sekunder dan teks sekunder.
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: //Badge yang biasanya digunakan untuk peringatan atau elemen berbahaya.
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground", //Badge dengan hanya teks, tanpa latar belakang atau border.
      },
    },
    defaultVariants: { //menetapkan varian default, yaitu default, yang akan digunakan jika tidak ada varian lain yang dipilih
      variant: "default",
    },
  }
)

function Badge({ // komponen React yang akan merender elemen div dengan styling badge.
  className, //props opsional untuk menambahkan class tambahan ke elemen div
  variant, //menentukan varian badge yang ingin digunakan.
  ...props //props yang diterima komponen Badge
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />); //menggabungkan class yang dihasilkan oleh badgeVariants dengan className tambahan yang diberikan.
}

export { Badge, badgeVariants }
// Badge: Mengekspor komponen Badge untuk digunakan di tempat lain dalam aplikasi.
// badgeVariants: Mengekspor konfigurasi badgeVariants, yang memungkinkan kita untuk menggunakan varian yang telah didefinisikan dalam kode ini di bagian lain aplikasi.