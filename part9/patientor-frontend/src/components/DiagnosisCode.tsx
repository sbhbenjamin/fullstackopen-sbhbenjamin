import React, { useState } from 'react';
import { useStateValue } from '../state';
import { Diagnoses } from '../types';

const DiagnosisCode = ({ code }: { code: string }) => {
  const [{ diagnosisCodes }] = useStateValue();
  const [name, setName] = useState<string>();

  const renderCodeDescription = (dcode: string): Diagnoses | undefined => {
    const diagnosis: Diagnoses | undefined = diagnosisCodes.find(
      (diagnosis) => diagnosis.code === dcode
    );

    return diagnosis;
  };

  React.useEffect(() => {
    const diagnosis = renderCodeDescription(code);
    if (diagnosis) {
      setName(diagnosis.name);
    }
  }, [diagnosisCodes, code]);

  return (
    <span>
      {code} {name && <span>{name}</span>}
    </span>
  );
};

export default DiagnosisCode;
