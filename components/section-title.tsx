type Props = {
  title: string
  subtitle?: string
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-12">
      <h2
        className="
        text-3xl
        md:text-5xl
        font-bold
        text-pink-800
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
          mt-4
          text-gray-600
          max-w-2xl
          mx-auto
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}