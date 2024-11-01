"use client";
import useCollectionController, {
  UseCollectionProps,
} from "@/shared/hooks/useCollectionController";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CollectionControllerProps =
  | ({
      formData: Record<string, any>;
      setFormData: Dispatch<SetStateAction<any>>;
    } & ReturnType<typeof useCollectionController>)
  | null;

const CollectionControllerContext =
  createContext<CollectionControllerProps>(null);

export function useCollection() {
  const context = useContext(CollectionControllerContext);
  if (!context) {
    throw new Error("Wrap components in ProductCollection ");
  } else return context;
}

export default function CollectionController<
  T extends Record<string, any>,
  FD extends Record<string, any>
>({
  initialFormData,
  useCollectionProps,
  children,
}: {
  initialFormData: FD;
  useCollectionProps: UseCollectionProps<T>;
  children: Readonly<ReactNode>;
}) {
  const controller = useCollectionController<T>(useCollectionProps);
  const [formData, setFormData] = useState<FD>(initialFormData);

  return (
    <CollectionControllerContext.Provider
      value={{ ...controller, formData, setFormData }}
    >
      {children}
    </CollectionControllerContext.Provider>
  );
}
