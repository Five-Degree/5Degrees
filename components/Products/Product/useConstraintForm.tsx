import { useState } from "react";

export default function useConstraintForm<FD>(initialFormData: FD) {
  const [formData, setFormData] = useState<FD>(initialFormData);
  return { formData, handleSetFormData: setFormData };
}
