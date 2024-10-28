import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useAppFormId() {
  const navigate = useNavigate();
  const params = useParams();

  const [appFormId, setAppFormId] = useState<number | null>(null);

  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/app-formularies");
    }

    setAppFormId(params.id as unknown as number);
  }, [navigate, params.id]);

  return appFormId;
}
