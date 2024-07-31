import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useHospitalId() {
  const navigate = useNavigate();
  const params = useParams();

  const [hospitalId, setHospitalId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/hospitals");
    }

    setHospitalId(params.id as unknown as number);
  }, [navigate, params.id]);

  return hospitalId;
}
