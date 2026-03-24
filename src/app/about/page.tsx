import type { Metadata } from "next";
import 
Link from "next/link";

export const metadata
: Metadata = {
  title: "About",
  descriptio
n:
    "Kyle Raap — 20 years of Autodesk Fa
brication experience. CADmep, ESTmep, CAMduct
 consulting for sheet metal and MEP contracto
rs. Now bringing AI to the trades.",
};

cons
t values = [
  {
    tag: "01",
    title: "T
rade Knowledge First",
    description:
     
 "Every recommendation starts with understand
ing the work. CADmep, BOMs, submittals, fabri
cation databases. If you have not lived it, y
ou cannot fix it.",
  },
  {
    tag: "02",
 
   title: "AI as the Tool, Not the Product",

    description:
      "AI is useful when it 
saves your estimator two hours on a reprice. 
It is not useful as a buzzword on a slide dec
k. We deploy what works and skip what does no
t.",
  },
  {
    tag: "03",
    title: "Resu
lts Over Process",
    description:
      "No
body cares how elegant the system is. They ca
re that the material takeoff is right, the qu
ote went out on time, and the crew has what t
hey need.",
  },
  {
    tag: "04",
    title
: "On-Site Accountability",
    description:

      "Remote advice is cheap. Showing up at 
the shop, training the team in person, and be
ing there when the workflow breaks — that i
s what makes it stick.",
  },
];

const timel
ine = [
  {
    year: "2005",
    title: "Sta
rted in the Trade",
    description:
      "B
egan working with Autodesk Fabrication Suite.
 CADmep, ESTmep, CAMduct — learning the too
ls from the shop floor up.",
  },
  {
    yea
r: "2010",
    title: "Fabrication Database S
pecialist",
    description:
      "Became th
e go-to person for Fabrication database setup
, maintenance, and custom library development
 across multiple shops.",
  },
  {
    year: 
"2018",
    title: "Process Optimization Focu
s",
    description:
      "Shifted focus to 
estimating workflow optimization and knowledg
e transfer — helping shops retain what thei
r senior people know.",
  },
  {
    year: "2
023",
    title: "Founded RaapTech LLC",
    
description:
      "Launched RaapTech to form
alize two decades of consulting work and brin
g AI tools to sheet metal and MEP contractors
.",
  },
  {
    year: "2025",
    title: "AI
 Onboarding for the Trades",
    description:

      "Started deploying AI tools on-site �
� Claude, ChatGPT — configured for real con
struction workflows. Estimating, RFIs, submit
tals, change orders.",
  },
];

export defaul
t function AboutPage() {
  return (
    <>
  
    {/* Hero */}
      <section className="pt
-32 pb-24 border-b border-dark-border">
     
   <div className="max-w-7xl mx-auto px-6">
 
         <div className="flex items-center ga
p-3 mb-6">
            <div className="w-8 h-
px bg-brand-emerald" />
            <span cla
ssName="section-tag">About RaapTech</span>
  
        </div>
          <h1 className="text-
5xl md:text-6xl font-bold text-white leading-
tight mb-8 max-w-3xl">
            Built by s
omeone who has actually been on the job site

          </h1>
          <p className="text-
slate-400 text-lg max-w-2xl leading-relaxed">

            RaapTech is not a tech startup t
hat read about construction. It is 20 years o
f Autodesk Fabrication work, packaged into a 
consulting practice that now includes AI.
   
       </p>
        </div>
      </section>


      {/* Founder */}
      <section classNam
e="py-24 border-b border-dark-border">
      
  <div className="max-w-7xl mx-auto px-6">
  
        <div className="grid grid-cols-1 md:g
rid-cols-2 gap-16 items-start">
            <
div>
              <div className="flex items
-center gap-3 mb-6">
                <div cla
ssName="w-8 h-px bg-brand-emerald" />
       
         <span className="section-tag">Founde
r</span>
              </div>
              <
h2 className="text-3xl font-bold text-white m
b-6">Kyle Raap</h2>
              <p classNam
e="text-slate-400 leading-relaxed mb-6">
    
            Kyle has spent 20 years inside th
e Autodesk Fabrication Suite — CADmep, ESTm
ep, CAMduct, Fabrication databases. Not selli
ng it. Using it. On the shop floor, in the fi
eld, training crews, fixing what broke.
     
         </p>
              <p className="tex
t-slate-400 leading-relaxed mb-6">
          
      He founded RaapTech because the trades 
need someone who speaks both languages. Your 
shop does not need a Silicon Valley tech team
. It needs someone who understands your fabri
cation database, knows what a BOM looks like,
 and can set up an AI tool that your estimato
r will actually use.
              </p>
     
         <p className="text-slate-400 leading
-relaxed mb-8">
                Today Kyle is
 on-site daily at sheet metal and MEP shops �
�� not just consulting from an office. He use
s AI tools in his own work every day, and he 
brings that same practical approach to every 
client engagement.
              </p>
       
       <div className="flex gap-4">
         
       <Link href="/contact" className="btn-p
rimary text-xs">
                  Get in Tou
ch
                </Link>
              </di
v>
            </div>

            <div class
Name="space-y-4">
              <div classNam
e="border border-dark-border bg-dark-surface 
p-6">
                <div className="font-mo
no text-xs text-slate-500 mb-4">
            
      {"// expertise_stack"}
                
</div>
                <div className="space-
y-3 font-mono text-sm">
                  {[

                    { key: "primary", value: 
"Autodesk Fabrication Suite" },
             
       { key: "tools", value: "CADmep / ESTme
p / CAMduct" },
                    { key: "d
omain", value: "Sheet Metal & MEP Ops" },
   
                 { key: "applied", value: "AI
 Workflow Design" },
                    { ke
y: "method", value: "Process Automation" },
 
                   { key: "delivery", value: 
"On-Site Training" },
                  ].map
((item) => (
                    <div key={it
em.key} className="flex justify-between gap-4
">
                      <span className="tex
t-slate-500">{item.key}</span>
              
        <span className="text-brand-orange">&
quot;{item.value}&quot;</span>
              
      </div>
                  ))}
          
      </div>
              </div>

          
    <div className="border border-dark-border
 bg-dark-surface p-4">
                <div c
lassName="flex items-center gap-2">
         
         <div className="w-2 h-2 bg-brand-eme
rald animate-pulse" />
                  <spa
n className="font-mono text-xs text-brand-eme
rald">
                    On-site daily — 
available for new clients
                  <
/span>
                </div>
              <
/div>
            </div>
          </div>
   
     </div>
      </section>

      {/* Value
s */}
      <section className="py-24 border-
b border-dark-border">
        <div className
="max-w-7xl mx-auto px-6">
          <div cla
ssName="flex items-center gap-3 mb-6">
      
      <div className="w-8 h-px bg-brand-emera
ld" />
            <span className="section-t
ag">How Kyle Works</span>
          </div>
  
        <h2 className="text-3xl font-bold tex
t-white mb-16">
            Operating princip
les
          </h2>

          <div className
="grid grid-cols-1 md:grid-cols-2 gap-px bg-d
ark-border">
            {values.map((value, 
i) => (
              <div key={i} className=
"bg-dark-bg p-8 hover:bg-dark-surface transit
ion-colors">
                <div className="
flex items-center gap-3 mb-4">
              
    <span className="font-mono text-xs text-s
late-600">
                    {value.tag}
  
                </span>
                  <di
v className="h-px flex-1 bg-dark-border" />
 
               </div>
                <h3 cla
ssName="font-semibold text-white text-lg mb-3
">
                  {value.title}
          
      </h3>
                <p className="tex
t-slate-400 text-sm leading-relaxed">
       
           {value.description}
              
  </p>
              </div>
            ))}
 
         </div>
        </div>
      </sectio
n>

      {/* Timeline */}
      <section cla
ssName="py-24">
        <div className="max-w
-7xl mx-auto px-6">
          <div className=
"flex items-center gap-3 mb-6">
            <
div className="w-8 h-px bg-brand-emerald" />

            <span className="section-tag">Tim
eline</span>
          </div>
          <h2 c
lassName="text-3xl font-bold text-white mb-16
">
            From the shop floor to AI
    
      </h2>

          <div className="relati
ve">
            <div className="absolute lef
t-24 top-0 bottom-0 w-px bg-dark-border" />
 
           <div className="space-y-0">
      
        {timeline.map((item, i) => (
        
        <div key={i} className="flex gap-8 gr
oup">
                  <div className="w-24 
shrink-0 pt-8">
                    <span cla
ssName="font-mono text-sm font-bold text-bran
d-orange">
                      {item.year}

                    </span>
                 
 </div>
                  <div className="rel
ative pt-8 pb-8 flex-1 border-b border-dark-b
order last:border-b-0">
                    <
div className="absolute left-0 top-10 w-3 h-3
 border border-brand-orange bg-dark-bg -trans
late-x-[calc(50%+0.5px)] group-hover:bg-brand
-orange transition-colors" />
               
     <h3 className="font-semibold text-white 
mb-2">
                      {item.title}
   
                 </h3>
                    <p
 className="text-slate-400 text-sm leading-re
laxed">
                      {item.descripti
on}
                    </p>
                
  </div>
                </div>
             
 ))}
            </div>
          </div>
    
    </div>
      </section>
    </>
  );
}


