(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1704],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),h=o,m=p["".concat(c,".").concat(h)]||p[h]||d[h]||i;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=p;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},7996:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return a},metadata:function(){return l},toc:function(){return c},default:function(){return s}});var r=n(2122),o=n(9756),i=(n(7294),n(3905)),a={title:"dockerimage",description:"Notes for building the Lido for Solana Docker image",keywords:["development","developers","lido","solana","docker","container"],sidebar_position:3},l={unversionedId:"development/building-docker-image",id:"development/building-docker-image",isDocsHomePage:!1,title:"Buiding a Docker image locally",description:"Notes for building the Lido for Solana Docker image",source:"@site/docs/development/building-docker-image.md",sourceDirName:"development",slug:"/development/building-docker-image",permalink:"/development/building-docker-image",version:"current",sidebarPosition:3,frontMatter:{title:"dockerimage",description:"Notes for building the Lido for Solana Docker image",keywords:["development","developers","lido","solana","docker","container"],sidebar_position:3},sidebar:"solidoSidebar",previous:{title:"Development Overview",permalink:"/development/development"},next:{title:"Integrating with Lido",permalink:"/development/frontend-integration"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Building",id:"building",children:[]},{value:"Running the container",id:"running-the-container",children:[]}],u={toc:c};function s(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In cases where there isn't a need to run the testnet (i.e. a local validator) and all that is required is the packaging of the Lido for Solana code and access to the Solana toolchain; there is the option of building a local container image."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Building a local version of the container requires that you have Docker installed but also the Rust toolchain."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://docs.docker.com/engine/install/"},"Docker")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://www.rust-lang.org/tools/install"},"Rust"))),(0,i.kt)("h2",{id:"building"},"Building"),(0,i.kt)("p",null,"To build the local image use the buildimage.sh script.  This will build and package Lido for Solana along with the Solana toolchain into an image:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-Docker"},"chorusone/solido:hash\n")),(0,i.kt)("p",null,"Where ",(0,i.kt)("em",{parentName:"p"},"hash")," will be the git hash of the current version of the code base."),(0,i.kt)("h2",{id:"running-the-container"},"Running the container"),(0,i.kt)("p",null,"Once built, one can execute into the container interactively:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"docker run -it --rm chorusone/solido:hash /bin/sh\n")),(0,i.kt)("p",null,"This will provide a shell into the working directory where the Lido for Solana artefacts and the Solana toolchain are located. Inside the container, the Lido for Solana build artefacts are located in the ",(0,i.kt)("strong",{parentName:"p"},"solido")," directory which has the following structure:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"/solido",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"/cli"),(0,i.kt)("li",{parentName:"ul"},"/deploy")))),(0,i.kt)("p",null,"The ",(0,i.kt)("em",{parentName:"p"},"cli")," directory contains the solido cli artefacts.  The ",(0,i.kt)("em",{parentName:"p"},"deploy")," directory contains the artefacts for the on-chain programs for Lido for Solana."))}s.isMDXComponent=!0}}]);