import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useReportId() {
  const navigate = useNavigate();
  const params = useParams();

  const [reportId, setReportId] = useState<number | null>(null);
  useEffect(() => {
    if (!params.id || isNaN(params.id as any)) {
      navigate("/reports");
    }

    setReportId(params.id as unknown as number);
  }, [navigate, params.id]);

  return reportId;
}
