import * as React from "react"

import { cn } from "@/lib/utils"
//Card adalah komponen utama yang berfungsi sebagai wadah utama.
const Card = React.forwardRef(({ className, ...props }, ref) => ( //forwardRef memungkinkan ref untuk diteruskan jika komponen ini digunakan dalam komponen lain.
  <div //Menggunakan elemen <div> dengan border, background (bg-card), dan shadow (shadow-sm).
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}//cn(...) menggabungkan class Tailwind dari utils.js.
    {...props} />
))
Card.displayName = "Card" //membantu React mengenali dan menampilkan nama komponen dengan lebih baik di alat debugging seperti React DevTools.
//CardHeader adalah bagian atas kartu (header).
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} //Menggunakan flex flex-col agar kontennya tersusun secara vertikal, space-y-1.5 memberi jarak antar elemen dalam header, p-6 memberi padding agar lebih rapi.
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 // elemen h3 untuk judul utama kartu.
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)} //text-2xl font-semibold membuat teks besar dan tebal, leading-none menghilangkan jarak antar baris, tracking-tight mengurangi spasi antar huruf.
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p //elemen <p> untuk teks deskripsi.
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} //text-sm membuat teks lebih kecil, text-muted-foreground memberikan warna teks yang lebih redup.
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> //<div> untuk bagian isi kartu, p-6 memberi padding di dalam konten, pt-0 (padding-top = 0) supaya tidak terlalu jauh dari bagian atas. 
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div //<div> untuk bagian bawah kartu.
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} //flex items-center menyusun elemen secara horizontal & rata tengah, p-6 pt-0 memberi padding tetapi tanpa padding atas.
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
