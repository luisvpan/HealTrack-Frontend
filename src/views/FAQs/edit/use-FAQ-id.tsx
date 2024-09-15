import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useFAQId() {
  const navigate = useNavigate();
  const params = useParams();

  const [faqId, setFAQId] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      navigate("/faqs"); 
    }

    setFAQId(params.id as unknown as string);
  }, [navigate, params.id]);

  return faqId;
}
