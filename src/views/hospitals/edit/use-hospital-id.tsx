import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useHospitalId() {
  const navigate = useNavigate();
  const params = useParams();

  const [hospitalId, setHospitalId] = useState<string | null>(null);
  useEffect(() => {

    if (!params.id) {
      navigate("/hospitals");
    }

    setHospitalId(params.id as unknown as string);
  }, [navigate, params.id]);

  return hospitalId;
}
