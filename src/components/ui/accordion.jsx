import * as React from "react" //Mengimpor semua fungsi React, termasuk useState, useEffect, dan forwardRef.
import * as AccordionPrimitive from "@radix-ui/react-accordion" //Mengimpor semua komponen dari @radix-ui/react-accordion, sebuah pustaka UI yang menyediakan elemen accordion.
import { ChevronDown } from "lucide-react" //Mengimpor ikon panah ke bawah (ChevronDown) dari pustaka ikon lucide-react.

import { cn } from "@/lib/utils" //Mengimpor fungsi cn, yang kemungkinan digunakan untuk menggabungkan class CSS secara dinamis.

const Accordion = AccordionPrimitive.Root //digunakan sebagai alias untuk AccordionPrimitive.Root sebagai komponen utama dari accordion yang menangani perilaku kontrol seperti ekspansi dan kontraksi item

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => ( //meneruskan (forward) ref ke komponen anak
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger //tombol yang bisa diklik untuk membuka/tutup accordion.
      ref={ref} //memastikan ref yang diteruskan ke AccordionTrigger langsung diarahkan ke elemen <AccordionPrimitive.Trigger>.
      className={cn( //menggabungkan class CSS bawaan dengan class tambahan dari props className.
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", //menjelaskan gaya CSS
        className
      )}
      {...props}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> 
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName //digunakan untuk membantu debugging dan meningkatkan keterbacaan di React DevTools. Disini, AccordionTrigger diberi displayName yang sama dengan AccordionPrimitive.Trigger.

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (//meneruskan ref ke elemen AccordionPrimitive.Content.
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName //Menetapkan properti displayName pada komponen AccordionContent agar lebih mudah diidentifikasi saat debugging atau melihat di React DevTools.

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } //digunakan untuk mengekspor komponen atau modul sehingga bisa digunakan di file lain.
