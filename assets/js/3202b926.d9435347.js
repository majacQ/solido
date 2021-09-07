(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2529],{3905:function(e,t,a){"use strict";a.d(t,{Zo:function(){return c},kt:function(){return d}});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,r=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(a),d=s,k=m["".concat(l,".").concat(d)]||m[d]||u[d]||r;return a?n.createElement(k,i(i({ref:t},c),{},{components:a})):n.createElement(k,i({ref:t},c))}));function d(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=a.length,i=new Array(r);i[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:s,i[1]=o;for(var p=2;p<r;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},2492:function(e,t,a){"use strict";a.r(t),a.d(t,{frontMatter:function(){return i},metadata:function(){return o},toc:function(){return l},default:function(){return c}});var n=a(2122),s=a(9756),r=(a(7294),a(3905)),i={title:"state",description:"Specification of the state.rs module",keywords:["development","developers","lido","specification","intent","state","solido","solana"],sidebar_position:12},o={unversionedId:"development/specification/solido/state",id:"development/specification/solido/state",isDocsHomePage:!1,title:"State",description:"Specification of the state.rs module",source:"@site/docs/development/specification/solido/state.md",sourceDirName:"development/specification/solido",slug:"/development/specification/solido/state",permalink:"/solido/development/specification/solido/state",version:"current",sidebarPosition:12,frontMatter:{title:"state",description:"Specification of the state.rs module",keywords:["development","developers","lido","specification","intent","state","solido","solana"],sidebar_position:12},sidebar:"solidoSidebar",previous:{title:"Process",permalink:"/solido/development/specification/solido/processor"},next:{title:"Token",permalink:"/solido/development/specification/solido/token"}},l=[{value:"Constants",id:"constants",children:[{value:"LIDO_VERSION",id:"lido_version",children:[]},{value:"LIDO_CONSTANT_HEADER_SIZE",id:"lido_constant_header_size",children:[]},{value:"LIDO_CONSTANT_FEE_SIZE",id:"lido_constant_fee_size",children:[]}]},{value:"Types",id:"types",children:[{value:"Validators",id:"validators",children:[]},{value:"Maintainers",id:"maintainers",children:[]}]},{value:"Structs",id:"structs",children:[{value:"Lido",id:"lido",children:[]},{value:"Validator",id:"validator",children:[]},{value:"FeeDistribution",id:"feedistribution",children:[]},{value:"FeeRecipients",id:"feerecipients",children:[]}]}],p={toc:l};function c(e){var t=e.components,a=(0,s.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"constants"},"Constants"),(0,r.kt)("h3",{id:"lido_version"},"LIDO_VERSION"),(0,r.kt)("p",null,"This byte specifies the version of the Solido state."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub const LIDO_VERSION: u8 = 0;\n")),(0,r.kt)("h3",{id:"lido_constant_header_size"},"LIDO_CONSTANT_HEADER_SIZE"),(0,r.kt)("p",null,"This defines the size of the header of the Solido state."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub const LIDO_CONSTANT_HEADER_SIZE: usize = 1 + 2 * 32 + 8 + 2;\n")),(0,r.kt)("p",null,"The header size should be equivalent to the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the size of the version byte"),(0,r.kt)("li",{parentName:"ul"},"the size of the manager and st_sol_mint public keys"),(0,r.kt)("li",{parentName:"ul"},"the size of the st_sol_total_shares which is an stLamports struct"),(0,r.kt)("li",{parentName:"ul"},"the size of the sol_reserve_authority_bump_seed and the deposit_authority_bump_seed")),(0,r.kt)("h3",{id:"lido_constant_fee_size"},"LIDO_CONSTANT_FEE_SIZE"),(0,r.kt)("p",null,"This defines the size of the fee section of the Lido state."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub const LIDO_CONSTANT_FEE_SIZE: usize = 2 * 32 + 3 * 4;\n")),(0,r.kt)("p",null,"This should be equivalent to the following:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the size of the FeeDistribution struct"),(0,r.kt)("li",{parentName:"ul"},"the size of the FeeRecipients struct")),(0,r.kt)("h2",{id:"types"},"Types"),(0,r.kt)("h3",{id:"validators"},"Validators"),(0,r.kt)("p",null,"The validators type uses the ",(0,r.kt)("a",{parentName:"p",href:"/solido/development/specification/solido/account_map#AccountMap"},"AccountMap")," struct and the ",(0,r.kt)("a",{parentName:"p",href:"/solido/development/specification/solido/state#Validator"},"Validator")," struct to create a helper type to assist in dealing with the collection of validators needed for the Soldio state."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub type Validators = AccountMap<Validator>;\n")),(0,r.kt)("h3",{id:"maintainers"},"Maintainers"),(0,r.kt)("p",null,"The Maintainers type leverages a type alias, ",(0,r.kt)("a",{parentName:"p",href:"/solido/development/specification/solido/account_map#AccountSet"},"AccountSet"),", for an ",(0,r.kt)("a",{parentName:"p",href:"/solido/development/specification/solido/account_map#AccountMap"},"AccountMap")," with a unit type."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub type Maintainers = AccountSet;\n")),(0,r.kt)("h2",{id:"structs"},"Structs"),(0,r.kt)("h3",{id:"lido"},"Lido"),(0,r.kt)("p",null,"This is the main structure for maintaining the Solido state."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Lido {\n    pub lido_version: u8,\n    pub manager: Pubkey,\n    pub st_sol_mint: Pubkey,\n    pub st_sol_total_shares: StLamports,\n    pub sol_reserve_authority_bump_seed: u8,\n    pub deposit_authority_bump_seed: u8,\n    pub fee_distribution: FeeDistribution,\n    pub fee_recipients: FeeRecipients,\n    pub validators: Validators,\n    pub maintainers: Maintainers,\n}\n")),(0,r.kt)("h4",{id:"implemented-functions-on-lido"},"Implemented functions on Lido"),(0,r.kt)("h5",{id:"calculate_size"},"calculate_size"),(0,r.kt)("p",null,"This function calculates the size of the Solido state ",(0,r.kt)("em",{parentName:"p"},"if")," it had the maximum number of validators and maintainers."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn calculate_size(max_validators: u32, max_maintainers: u32) -> usize {\n")),(0,r.kt)("h5",{id:"calc_pool_tokens_for_deposit"},"calc_pool_tokens_for_deposit"),(0,r.kt)("p",null,"This function calculates the correct amount of pool tokens, stSOL, for a given stake deposit in SOL."),(0,r.kt)("div",{className:"math math-display"},(0,r.kt)("span",{parentName:"div",className:"katex-display"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mtext",{parentName:"mrow"},"equivalent\xa0pool\xa0token\xa0(stLamports)"),(0,r.kt)("mo",{parentName:"mrow"},"="),(0,r.kt)("mtext",{parentName:"mrow"},"stake\xa0equivalent\xa0in\xa0stLamports"),(0,r.kt)("mo",{parentName:"mrow"},"\u2217"),(0,r.kt)("mfrac",{parentName:"mrow"},(0,r.kt)("mtext",{parentName:"mfrac"},"Total\xa0Shares\xa0stLamports"),(0,r.kt)("mtext",{parentName:"mfrac"},"Total\xa0Lamports"))),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\textnormal{equivalent pool token (stLamports)}=\\textnormal{stake equivalent in stLamports}*\\frac{\\textnormal{Total Shares stLamports}}{\\textnormal{Total Lamports}}")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord text"},(0,r.kt)("span",{parentName:"span",className:"mord textrm"},"equivalent\xa0pool\xa0token\xa0(stLamports)")),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}}),(0,r.kt)("span",{parentName:"span",className:"mrel"},"="),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2777777777777778em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8888799999999999em",verticalAlign:"-0.19444em"}}),(0,r.kt)("span",{parentName:"span",className:"mord text"},(0,r.kt)("span",{parentName:"span",className:"mord textrm"},"stake\xa0equivalent\xa0in\xa0stLamports")),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2217"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222222222222222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"2.25188em",verticalAlign:"-0.8804400000000001em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mopen nulldelimiter"}),(0,r.kt)("span",{parentName:"span",className:"mfrac"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"1.3714399999999998em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-2.314em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord text"},(0,r.kt)("span",{parentName:"span",className:"mord textrm"},"Total\xa0Lamports")))),(0,r.kt)("span",{parentName:"span",style:{top:"-3.23em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"frac-line",style:{borderBottomWidth:"0.04em"}})),(0,r.kt)("span",{parentName:"span",style:{top:"-3.677em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord text"},(0,r.kt)("span",{parentName:"span",className:"mord textrm"},"Total\xa0Shares\xa0stLamports"))))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.8804400000000001em"}},(0,r.kt)("span",{parentName:"span"}))))),(0,r.kt)("span",{parentName:"span",className:"mclose nulldelimiter"}))))))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn calc_pool_tokens_for_deposit(\n    &self,\n    stake_lamports: Lamports,\n    total_lamports: Lamports,\n) -> Option<StLamports> {\n")),(0,r.kt)("h5",{id:"is_initialized"},"is_initialized"),(0,r.kt)("p",null,"Checks if the instance of Solido has already been initialized."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn is_initialized(&self) -> ProgramResult {\n")),(0,r.kt)("h5",{id:"check_mint_is_st_sol_mint"},"check_mint_is_st_sol_mint"),(0,r.kt)("p",null,"Confirms that the passed mint account is indeed Solido's expected stSOL mint."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn check_mint_is_st_sol_mint(&self, mint_account_info: &AccountInfo) -> ProgramResult {\n")),(0,r.kt)("h5",{id:"check_is_st_sol_account"},"check_is_st_sol_account"),(0,r.kt)("p",null,"Confirms that the given account is an SPL token account with our stSOL mint as mint."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn check_is_st_sol_account(&self, token_account_info: &AccountInfo) -> ProgramResult {\n")),(0,r.kt)("h5",{id:"check_manager"},"check_manager"),(0,r.kt)("p",null,"Checks if the passed manager is the same as the one stored in the state"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn check_manager(&self, manager: &AccountInfo) -> ProgramResult {\n")),(0,r.kt)("h5",{id:"check_maintainer"},"check_maintainer"),(0,r.kt)("p",null,"Checks if the passed maintainer belong to the list of maintainers"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn check_maintainer(&self, maintainer: &AccountInfo) -> ProgramResult {\n")),(0,r.kt)("h5",{id:"get_reserve_account"},"get_reserve_account"),(0,r.kt)("p",null,"This function returns the address of the reserve account, i.e. the account where SOL gets deposited to."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn get_reserve_account(\n  &self,\n  program_id: &Pubkey,\n  solido_address: &Pubkey,\n) -> Result<Pubkey, ProgramError> {\n")),(0,r.kt)("h5",{id:"check_reserve_authority"},"check_reserve_authority"),(0,r.kt)("p",null,"Confirms that the reserve authority passed does in fact belong to this Solido instance."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn check_reserve_authority(\n  &self,\n  program_id: &Pubkey,\n  solido_address: &Pubkey,\n  reserve_authority_info: &AccountInfo,\n) -> Result<Pubkey, ProgramError> {\n")),(0,r.kt)("h3",{id:"validator"},"Validator"),(0,r.kt)("p",null,"The validator struct maintains the data regarding each validator that is required to generate staking accounts and maintain the fees due."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct Validator {\n    pub fee_credit: StLamports,\n    pub fee_address: Pubkey,\n    pub stake_accounts_seed_begin: u64,\n    pub stake_accounts_seed_end: u64,\n    pub stake_accounts_balance: Lamports,\n}\n")),(0,r.kt)("h4",{id:"implemented-functions-on-validator"},"Implemented functions on Validator"),(0,r.kt)("h5",{id:"find_stake_account_address"},"find_stake_account_address"),(0,r.kt)("p",null,"This function finds a stake account associated with a given validator vote account."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn find_stake_account_address(\n    program_id: &Pubkey,\n    solido_account: &Pubkey,\n    validator_vote_account: &Pubkey,\n    seed: u64,\n) -> (Pubkey, u8) {\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"This function wraps the Solana ",(0,r.kt)("inlineCode",{parentName:"p"},"Pubkey::find_program_address"),". That function tries to find a valid program address and its corresponding bump seed which must be passed as an additional seed when calling ",(0,r.kt)("inlineCode",{parentName:"p"},"invoke_signed"),".\nThe processes of finding a valid program address is by trial and error,and even though it is deterministic given a set of inputs it can take a variable amount of time to succeed across different inputs.  This means that when called from an on-chain program it may incur a variable amount of the program's compute budget.  Programs that are meant to be very performant may not want to use this function because it could take a considerable amount of time.  Also, programs that area already at risk of exceeding their compute budget should also call this with care since there is a chance that the program's budget may be occasionally exceeded.")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Additional Note: The underlying Solana program function will panic in the very unlikely event that the additional seed could not be found.")),(0,r.kt)("h3",{id:"feedistribution"},"FeeDistribution"),(0,r.kt)("p",null,"The FeeDistribution struct simply maintains the ratios of distribution between the treasury, developer (Chorus One), and the validators."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct FeeDistribution {\n    pub treasury_fee: u32,\n    pub validation_fee: u32,\n    pub developer_fee: u32,\n}\n")),(0,r.kt)("h3",{id:"feerecipients"},"FeeRecipients"),(0,r.kt)("p",null,"The FeeRecipients struct is another simple struct that holds the Pubkey addresses of the treasury and developer (Chorus One) accounts that will receive fees."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},"pub struct FeeRecipients {\n    pub treasury_account: Pubkey,\n    pub developer_account: Pubkey,\n}\n")))}c.isMDXComponent=!0}}]);