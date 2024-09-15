import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function useRecommendationId() {
  const navigate = useNavigate();
  const params = useParams();

  const [recommendationId, setRecommendationId] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      navigate("/recommendations");
    }

    setRecommendationId(params.id as unknown as string);
  }, [navigate, params.id]);

  return recommendationId;
}
