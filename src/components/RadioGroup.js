import { useRadioState, Radio, RadioGroup as ReakitRadioGroup } from "reakit/Radio";

export function RadioGroup({ items, label, onChange, value, required, disabled }) {
  const radio = useRadioState();
  return (
    <div className="pb-4">
      <ReakitRadioGroup {...radio} aria-label={label}>
        {items.map((item) => (
          <label key={item.value} className={`flex items-center ${disabled ? "text-tandemDarkGray" : ""}`}>
            <Radio
              {...radio}
              value={item.value}
              checked={value === item.value}
              className="mr-2"
              style={{ height: "2.5rem" }}
              onChange={onChange}
              required={required}
              disabled={disabled}
            />{" "}
            {item.label}
          </label>
        ))}
      </ReakitRadioGroup>
    </div>
  );
}
