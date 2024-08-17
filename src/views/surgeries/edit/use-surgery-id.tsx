import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useSurgeryId() {
  const navigate = useNavigate();
  const params = useParams();

  const [surgeryId, setSurgeryId] = useState<string | null>(null);
  useEffect(() => {
    if (!params.id) {
      navigate("/surgeries");
    }

    setSurgeryId(params.id as unknown as string);
  }, [navigate, params.id]);

  return surgeryId;
}
