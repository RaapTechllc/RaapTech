import type { Metadata } from "next";
import 
Link from "next/link";

export const metadata
: Metadata = {
  title: "Services",
  descrip
tion:
    "Autodesk Fabrication consulting an
d AI onboarding for sheet metal and MEP contr
actors. CADmep, ESTmep, CAMduct, database mai
ntenance, and AI workflow setup.",
};

export
 default function ServicesPage() {
  return (

    <>
      {/* Hero */}
      <section cla
ssName="pt-32 pb-16 border-b border-dark-bord
er">
        <div className="max-w-7xl mx-aut
o px-6">
          <div className="flex items
-center gap-3 mb-6">
            <div classNa
me="w-8 h-px bg-brand-emerald" />
           
 <span className="section-tag">Services</span
>
          </div>
          <h1 className="t
ext-5xl md:text-6xl font-bold text-white lead
ing-tight mb-6 max-w-3xl">
            Two th
ings we do. Both grounded in 20 years of trad
e work.
          </h1>
          <p classNam
e="text-slate-400 text-lg max-w-2xl">
       
     Every engagement starts with the same qu
estion: what is actually slowing your shop do
wn? Then we fix that. No extra layers, no ups
ells.
          </p>
        </div>
      </s
ection>

      {/* Service 1 */}
      <secti
on className="py-24 border-b border-dark-bord
er">
        <div className="max-w-7xl mx-aut
o px-6">
          <div className="grid grid-
cols-1 lg:grid-cols-2 gap-16">
            <d
iv>
              <div className="flex items-
center gap-3 mb-6">
                <span cla
ssName="font-mono text-xs text-slate-600">01<
/span>
                <div className="h-px f
lex-1 bg-dark-border" />
              </div>

              <h2 className="text-3xl font-b
old text-white mb-6">
                Autodes
k Fabrication Consulting
              </h2>

              <p className="text-slate-400 le
ading-relaxed mb-6">
                Your fab
rication database is the backbone of your sho
p. When it is wrong, estimates are wrong, BOM
s are wrong, and someone eats the difference.
 Kyle has spent 20 years keeping these system
s running.
              </p>
              <
p className="text-slate-400 leading-relaxed m
b-8">
                The real cost is not th
e software license. It is the tribal knowledg
e that walks out the door when your senior gu
y retires. Knowledge transfer is built into e
very engagement.
              </p>
         
   </div>

            <div className="space-
y-4">
              <div className="border bo
rder-dark-border bg-dark-surface p-6">
      
          <h3 className="font-mono text-xs te
xt-brand-emerald mb-4 tracking-widest upperca
se">
                  What This Covers
     
           </h3>
                <ul classNam
e="space-y-3">
                  {[
         
           "CADmep, ESTmep, CAMduct setup and
 configuration",
                    "Fabrica
tion database maintenance and custom librarie
s",
                    "Pricing table update
s and estimating workflow optimization",
    
                "On-site training your team a
ctually retains",
                    "Knowle
dge transfer — documenting what your senior
 people know",
                    "Process a
udits and workflow fixes",
                  
].map((item, i) => (
                    <li 
key={i} className="flex items-start gap-3 tex
t-sm text-slate-400">
                      <
div className="w-1.5 h-1.5 bg-brand-orange mt
-1.5 shrink-0" />
                      {item
}
                    </li>
                 
 ))}
                </ul>
              </di
v>

              <div className="border bord
er-dark-border bg-dark-surface p-4">
        
        <div className="font-mono text-xs tex
t-slate-500">
                  Pricing: proj
ect-based or hourly.{" "}
                  <
Link href="/contact" className="text-brand-or
ange hover:text-white transition-colors">
   
                 Contact for details.
       
           </Link>
                </div>
   
           </div>
            </div>
        
  </div>
        </div>
      </section>

   
   {/* Service 2 */}
      <section className
="py-24 border-b border-dark-border">
       
 <div className="max-w-7xl mx-auto px-6">
   
       <div className="grid grid-cols-1 lg:gr
id-cols-2 gap-16">
            <div>
        
      <div className="flex items-center gap-3
 mb-6">
                <span className="font
-mono text-xs text-slate-600">02</span>
     
           <div className="h-px flex-1 bg-dar
k-border" />
              </div>
           
   <h2 className="text-3xl font-bold text-whi
te mb-6">
                AI Onboarding for M
EP &amp; Sheet Metal Contractors
            
  </h2>
              <p className="text-slat
e-400 leading-relaxed mb-6">
                
Your competitor is turning around quotes fast
er because they stopped doing everything by h
and. AI is not going to replace your estimato
r. But an estimator with AI is going to outwo
rk one without it.
              </p>
       
       <p className="text-slate-400 leading-r
elaxed mb-8">
                This is not a g
eneric AI workshop. Kyle sets up the tools fo
r your actual workflows — the RFIs your tea
m writes, the submittals you send, the change
 orders you process. Then he trains your peop
le on-site until it sticks.
              </p
>
            </div>

            <div classN
ame="space-y-4">
              <div className
="border border-dark-border bg-dark-surface p
-6">
                <h3 className="font-mono
 text-xs text-brand-emerald mb-4 tracking-wid
est uppercase">
                  How It Work
s
                </h3>
                <ul c
lassName="space-y-3">
                  {[
  
                  "Assessment: where AI actua
lly helps in your workflow",
                
    "Setup: Claude.ai or ChatGPT for Business
, configured for your shop",
                
    "Templates: estimating, RFIs, submittals,
 change orders, safety docs",
               
     "On-site training session with your team
",
                    "Monthly retainer for 
ongoing support and prompt updates",
        
          ].map((item, i) => (
              
      <li key={i} className="flex items-start
 gap-3 text-sm text-slate-400">
             
         <div className="w-1.5 h-1.5 bg-brand
-orange mt-1.5 shrink-0" />
                 
     {item}
                    </li>
       
           ))}
                </ul>
        
      </div>

              <div className="b
order border-dark-border bg-dark-surface p-4"
>
                <div className="font-mono t
ext-xs text-slate-500">
                  Mon
thly retainer available.{" "}
               
   <Link href="/contact" className="text-bran
d-orange hover:text-white transition-colors">

                    Contact for details.
   
               </Link>
                </div>

              </div>
            </div>
    
      </div>
        </div>
      </section>


      {/* CTA */}
      <section className="
py-24">
        <div className="max-w-7xl mx-
auto px-6">
          <div className="border 
border-dark-border bg-dark-surface p-12 flex 
flex-col md:flex-row items-start md:items-cen
ter justify-between gap-8">
            <div>

              <span className="section-tag m
b-3 block">Next Step</span>
              <h2
 className="text-3xl font-bold text-white">
 
               Not sure which service fits? L
et&apos;s talk about your shop.
             
 </h2>
            </div>
            <Link h
ref="/contact" className="btn-primary whitesp
ace-nowrap">
              Start a Conversati
on
            </Link>
          </div>
     
   </div>
      </section>
    </>
  );
}


