import tw from "tailwind-styled-components";

export const TEInput = tw.input`
peer 
block 
min-h-[auto] 
w-full 
rounded 
bg-transparent 
outline-none 
transition-all 
duration-200 
ease-linear 
focus:placeholder:opacity-100 
peer-focus:text-primary 
motion-reduce:transition-none
disabled:bg-neutral-100 
read-only:bg-neutral-100 
dark:disabled:bg-neutral-700 
dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary 
px-3 
py-[0.32rem] 
leading-[2.15] 
text-neutral-800 
dark:text-neutral-200 
mb-6 
px-7 
pb-2.5 
pt-3 
text-sm 
border-neutral-100	
border 
border-solid
`;

export const StyledInputWrap = tw.div`
 w-full
 h-full
 relative
`;
