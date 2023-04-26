import clsx from "clsx";
import { ButtonProps, ActionButton } from "../components/elements/button";
import Card, { CardProps } from "../components/elements/Card";
import { Label } from "../components/elements/Text";

type Props = {
   title: string;
   className?: string;
   actionButtons?: ButtonProps[];
   cardProps?: CardProps;
   children?: React.ReactNode
 };
 
 const Section: React.FC<Props> = ({
   title,
   className,
   actionButtons,
   children,
   cardProps = {},
 }) => {
   return (
     <div className={className}>
       <div className="flex items-center justify-between mb-1">
         {title && <Label>{title}</Label>}
         {actionButtons && (
           <div className="flex items-center">
             {actionButtons.map(({ className, ...button }, index) => (
               <ActionButton
                 key={index}
                 {...button}
                 className={clsx("!p-0 !pl-3", className)}
               />
             ))}
           </div>
         )}
       </div>
 
       <Card {...cardProps}>{children}</Card>
     </div>
   );
 };
 
 export default Section;
 