import React from 'react';

import { SEARCH_RESULT_LIMITS } from "../constants";

type LimitSelectProps = {
  value: string | undefined,
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const LimitSelect = (props: LimitSelectProps) => {
  const { value, onChange } = props;

  return (
    <select onChange={onChange} value={value}>
      {SEARCH_RESULT_LIMITS.map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}

export default LimitSelect
