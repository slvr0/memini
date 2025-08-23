import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const QuoteSegment : React.FC = () => {
  return (
    <Card
      elevation={3}
      className="max-w-3xl mx-auto  bg-slate-50 rounded-2xl shadow-lg border border-slate-200"
    >
      <CardContent className="p-6">
        <Typography
          variant="body1"
          className="text-slate-700 italic leading-relaxed"
        >
          "We may climb into the thin and cold realm of pure geometry and
          lifeless science, or sink into that of sensation. Between these
          extremes is the equator of life, of thought, or spirit, or poetry,—a
          narrow belt."
        </Typography>
        <Typography
          variant="subtitle2"
          className="mt-4 text-right text-slate-500 font-medium"
        >
          — Ralph Waldo Emerson
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuoteSegment;
