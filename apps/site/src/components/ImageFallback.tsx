import Image from "next/image";
export default function ImageFallback({src,alt,width,height,className}:{src?:string;alt:string;width:number;height:number;className?:string}) {
  if(!src) return <div style={{width,height}} aria-hidden="true" className={className} />;
  return <Image src={src} alt={alt} width={width} height={height} loading="lazy" />;
}
