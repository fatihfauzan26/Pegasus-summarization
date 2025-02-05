import * as CollapsiblePrimitive from "@radix-ui/react-collapsible" //Mengimpor semua modul dari paket @radix-ui/react-collapsible dan menyimpannya dalam objek CollapsiblePrimitive.

const Collapsible = CollapsiblePrimitive.Root //CollapsiblePrimitive.Root adalah komponen utama yang membungkus seluruh konten yang dapat dilipat.

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger //CollapsiblePrimitive.CollapsibleTrigger adalah tombol atau elemen yang mengontrol buka/tutup collapsible.

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent //CollapsiblePrimitive.CollapsibleContent adalah konten yang tersembunyi saat collapsible tertutup dan muncul saat collapsible dibuka.

export { Collapsible, CollapsibleTrigger, CollapsibleContent } //Mengekspor tiga komponen (Collapsible, CollapsibleTrigger, dan CollapsibleContent) agar bisa digunakan di komponen lain tanpa perlu mengimpor langsung dari Radix UI.
