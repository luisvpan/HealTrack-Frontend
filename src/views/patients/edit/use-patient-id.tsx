import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function usePatientId() {
  const navigate = useNavigate();
  const params = useParams();

  const [patientId, setPatientId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/patients");
    }

    setPatientId(params.id as unknown as number);
  }, [navigate, params.id]);

  return patientId;
}
