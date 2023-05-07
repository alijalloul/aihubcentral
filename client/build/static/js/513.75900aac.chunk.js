"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[513],{9893:function(e,a,t){t.r(a),t.d(a,{default:function(){return b}});var n=t(4942),i=t(4165),s=t(5861),r=t(1413),l=t(9439),o=t(2791),c=t(6492),d=t(6193),p=t(8431),u=t(184),m=function(e){var a=e.stylingT;return(0,u.jsxs)("div",{className:"lds-ring ".concat(a),children:[(0,u.jsx)("div",{}),(0,u.jsx)("div",{}),(0,u.jsx)("div",{}),(0,u.jsx)("div",{})]})},h=["Depict a dramatic battle scene between two mythical creatures.","Create an abstract painting that evokes the feeling of freedom.","Illustrate a magical forest full of whimsical creatures and plants.","Design an otherworldly spaceship for a sci-fi movie.","Paint a portrait of an elderly person and capture their wisdom and experience.","Draw a futuristic cityscape with towering skyscrapers and neon lights.","Create a mixed media piece inspired by the concept of time.","Depict a serene countryside landscape with rolling hills and a clear blue sky.","Design an intricate mandala with intricate patterns and symbols.","Paint a still life of a bowl of fruit with rich colors and textures.","Illustrate a majestic dragon soaring through the clouds.","Create a digital illustration of a bustling marketplace in a foreign land.","Depict a mystical underwater world with mermaids and sea creatures.","Design a whimsical illustration for a children's book.","Paint a landscape of a quiet winter night with snow-covered trees and a full moon.","Draw a surreal portrait of a person with a unique personality.","Create a sculpture of an animal that represents strength and power.","Illustrate a post-apocalyptic world with a stark, desolate landscape.","Design a cover for a fantasy novel with intricate details and symbols.","Paint a portrait of a person with a kind and compassionate soul.","Depict a dramatic stormy sea with crashing waves and dark skies.","Create a mixed media piece that represents the concept of rebirth.","Illustrate a bustling city street with people from different cultures and backgrounds.","Design an intricate tattoo inspired by nature.","Paint a still life of a bouquet of flowers with soft colors and delicate brushstrokes.","Draw a whimsical scene of a fantastical creature interacting with everyday objects.","Create a digital illustration of a fantastical castle on a mountaintop.","Depict a mystical forest with glowing mushrooms and hidden secrets.","Design a surreal landscape inspired by dreams and the subconscious mind.","Paint a portrait of a person with a fierce determination and passion.","Illustrate a fantastical world with mythical creatures and magical spells.","Create a sculpture of a person with a complex emal inner world.","Depict a serene beach with turquoise waters and palm trees.","Design an intricate pattern inspired by the natural world.","Paint a landscape of a peaceful countryside with rolling hills and a babbling brook.","Draw a fantastical creature with intricate details and unique characteristics.","Create a mixed media piece that represents the concept of hope.","Illustrate a cityscape at night with glowing lights and reflections in the water.","Design an intricate logo for a new company with a strong brand identity.","Paint a portrait of a person with a mischievous spirit and a twinkle in their eye.","Depict a majestic mountain range with snow-capped peaks and a deep valley below.","Create a digital illustration of a fantastical world with floating islands and airships.","Design a surrealist landscape inspired by the work of Salvador Dali.","Paint a still life of a vase of flowers with bold, vibrant colors.","Illustrate a mythical creature interacting with a real-life animal.","Depict a quiet forest with a gentle stream running through it.","Create a sculpture of an abstract concept, such as love or hope.","Design an intricate tattoo inspired by a piece of literature.","Paint a portrait of a person with a quiet confidence."],g=t.p+"static/media/empty.7390f0c1f3d96b693f7c.jpg",b=function(){var e,a,t={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SERVER_URL||"http://localhost:5000",b=(0,o.useState)({name:"",prompt:"",nbImages:1,generatedImages:[]}),f=(0,l.Z)(b,2),w=f[0],x=f[1],y=(0,o.useState)(!1),v=(0,l.Z)(y,2),j=v[0],k=v[1],N=(0,o.useState)(0),C=(0,l.Z)(N,2),D=C[0],I=C[1],E=(0,o.useState)(512),Z=(0,l.Z)(E,2),S=Z[0],P=Z[1],T=(0,o.useState)({promptEmpty:!1,nbImagesEmpty:!1}),q=(0,l.Z)(T,2),_=q[0],A=q[1],R=function(){var e=(0,s.Z)((0,i.Z)().mark((function e(){var a,n,s;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=!1,(w.nbImages<1||w.nbImages>5)&&(A((0,r.Z)((0,r.Z)({},_),{},{nbImagesEmpty:!0})),a=!0),w.prompt||(A((0,r.Z)((0,r.Z)({},_),{},{promptEmpty:!0})),a=!0),console.log(_),a){e.next=24;break}return k(!0),e.prev=6,e.next=9,fetch("".concat(t,"/api/openai/dalle"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:w.prompt,nbImages:w.nbImages,resolution:S})});case 9:return n=e.sent,e.next=12,n.json();case 12:s=e.sent,x((0,r.Z)((0,r.Z)({},w),{},{generatedImages:s.images})),I(0),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(6),console.log(e.t0),k(!1);case 21:return e.prev=21,k(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[6,17,21,24]])})));return function(){return e.apply(this,arguments)}}(),O=function(e){x((0,r.Z)((0,r.Z)({},w),{},(0,n.Z)({},e.target.name,e.target.value)))};return(0,u.jsx)(c.X,{features:d.H,children:(0,u.jsxs)(p.m.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"h-fit min-h-[calc(100vh-73px)] w-full px-10 flex bg-slate-50 justify-between md:flex-col",children:[(0,u.jsx)("div",{className:"pl-10 flex flex-col justify-center md:pl-0",children:(0,u.jsxs)("div",{className:"h-fit w-[80%] md:w-full",children:[(0,u.jsxs)("p",{className:"w-full my-2 text-black text-6xl mb-5 leading-[4rem] md:text-4xl",children:[(0,u.jsx)("span",{className:"inline-block",style:{background:"linear-gradient(45deg, rgba(255,0,224,1) 0%, rgba(0,1,255,1) 100%)",backgroundClip:"text",color:"transparent","font-weight":"bold"},children:"Create\xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"Stunning\xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"And\xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"Creative\xa0"}),(0,u.jsx)("span",{className:"inline-block",style:{background:"linear-gradient(45deg, rgba(0,255,248,1) 0%, rgba(255,0,202,1) 100%)",backgroundClip:"text",color:"transparent","font-weight":"bold"},children:"Images\xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"From \xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"Prompts \xa0"}),(0,u.jsx)("span",{className:"inline-block",children:"Using \xa0"}),(0,u.jsx)("span",{className:"inline-block",style:{background:"linear-gradient(45deg, rgba(239,0,255,1) 0%, rgba(255,0,0,1) 100%)",backgroundClip:"text",color:"transparent","font-weight":"bold"},children:"DALLE-2 AI!\xa0"})]}),(0,u.jsxs)("form",{className:"mb-3",children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("p",{children:"Your Name"}),(0,u.jsx)("input",{name:"name",type:"text",placeholder:"John White",className:" outline-none mb-5 p-2 w-full rounded-sm border-solid border-2 border-gray-600",onChange:O})]}),(0,u.jsxs)("div",{className:"mb-3",children:[(0,u.jsx)("p",{children:"Resolution"}),(0,u.jsxs)("div",{className:"w-fit flex rounded-md border-2 border-black",children:[(0,u.jsx)("button",{onClick:function(e){e.preventDefault(),P(256)},className:"px-5 py-3 ".concat(256===S&&"bg-black text-white"," transition-all ease-in-out"),children:"256x256"}),(0,u.jsx)("button",{onClick:function(e){e.preventDefault(),P(512)},className:"px-5 py-3 border-x-2 border-black ".concat(512===S&&"bg-black text-white"," transition-all ease-in-out"),children:"512x512"}),(0,u.jsx)("button",{onClick:function(e){e.preventDefault(),P(1024)},className:"px-5 py-3 ".concat(1024===S&&"bg-black text-white"," transition-all ease-in-out"),children:"1024x1024"})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("p",{style:{color:_.nbImagesEmpty&&"red"},children:"Number of Images"}),(0,u.jsx)("input",{name:"nbImages",type:"text",value:w.nbImages,onChange:function(e){O(e),A((0,r.Z)((0,r.Z)({},_),{},{nbImagesEmpty:!1}))},style:{borderColor:"".concat(_.nbImagesEmpty?"red":"black")},className:"outline-none ".concat(_.nbImagesEmpty?"mb-0":"mb-2"," p-2 w-[10%] text-center rounded-sm border-solid border-2 border-gray-600")}),(0,u.jsx)("p",{className:"".concat(!_.nbImagesEmpty&&"hidden"," text-red-600 italic mb-2"),children:"The number of images should be between 1 and 5 "})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("p",{style:{color:_.promptEmpty&&"red"},children:"Prompt"}),(0,u.jsx)("input",{name:"prompt",type:"text",placeholder:"A pizza wearing glasses eating a pizza",value:w.prompt,onChange:function(e){O(e),A((0,r.Z)((0,r.Z)({},_),{},{promptEmpty:!1}))},style:{borderColor:"".concat(_.promptEmpty?"red":"black")},className:"outline-none ".concat(_.promptEmpty?"mb-0":"mb-2"," p-2 w-full rounded-sm border-solid border-2 border-gray-600")}),(0,u.jsx)("p",{className:"".concat(!_.promptEmpty&&"hidden"," text-red-600 italic mb-2"),children:"Please fill the prompt"}),(0,u.jsx)("button",{onClick:function(e){e.preventDefault(),x((0,r.Z)((0,r.Z)({},w),{},{prompt:h[Math.floor(Math.random()*h.length)]}))},className:"px-2 py-3 bg-[rgb(109,84,210)] text-white rounded-md hover:bg-[rgb(77,56,158)] transition-all ease-in-out duration-200",children:"Suprise Me"})]})]}),(0,u.jsx)("button",{onClick:R,className:"mb-2 py-2 w-full bg-black rounded-md text-white hover:bg-yellow-600 transition ease-in-out duration-200",children:"Generate"})]})}),(0,u.jsxs)("div",{className:"relative  w-[50vw] flex justify-center items-center md:my-10 md:w-full md:h-[35vh]",children:[(0,u.jsx)("button",{onClick:function(){return I(D>0&&D-1)},className:"h-[35vw] w-10 rounded-l-lg flex items-center justify-center bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-all ease-in-out duration-200 md:h-full text-white",children:"<"}),(0,u.jsx)("div",{className:" md:h-[35vh] md:aspect-square",children:(0,u.jsxs)("div",{className:"relative h-[35vw] aspect-square overflow-hidden md:h-full",children:[j&&(0,u.jsx)(m,{stylingT:"absolute aspect-square absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}),(0,u.jsx)("div",{className:"relative flex w-max h-full transition-all ease-in-out",style:{left:"".concat(-1*D*100,"%")},children:(null===w||void 0===w||null===(e=w.generatedImages)||void 0===e?void 0:e.length)>0?null===w||void 0===w||null===(a=w.generatedImages)||void 0===a?void 0:a.map((function(e,a){return(0,u.jsx)("img",{src:e,alt:"N/A",className:"h-full aspect-square object-contain ".concat(j&&"filter: opacity-20")},a)})):(0,u.jsx)("img",{src:g,alt:"N/A",className:"h-full aspect-square object-contain ".concat(j&&"filter: opacity-20")})})]})}),(0,u.jsx)("button",{onClick:function(){var e;D<(null===w||void 0===w||null===(e=w.generatedImages)||void 0===e?void 0:e.length)-1&&I(D+1),console.log(D,":","left-[-".concat(100*D,"%]"))},className:"h-[35vw] w-10 rounded-r-lg flex items-center justify-center bg-gray-500 hover:bg-gray-400 active:bg-gray-300 transition-all ease-in-out duration-200 md:h-full text-white",children:">"})]})]})})}}}]);
//# sourceMappingURL=513.75900aac.chunk.js.map