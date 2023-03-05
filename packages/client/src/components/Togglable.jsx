import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef(({ children, buttonLabel = 'Show' }, ref ) => {
  const [visible, setVisible] = useState(false)

  const hidWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <main className={
      hidWhenVisible.display === '' 
        ? 'modal ml-auto mt-auto w-[52px] flex sticky bottom-6 right-6   sm:bottom-12 sm:right-24   2xl:right-36'
        : 'modal w-full h-full bg-[#1d1c21dc] flex absolute'
      }
    >
      <section style={hidWhenVisible} className="flex items-center justify-center">
        <button
          onClick={toggleVisibility}
          className="shadow-button m-0 p-3 text-[#1D1C21] bg-[#F2F2F2] rounded-full   xl:p-4"
        >
          { buttonLabel === 'New Note'
              ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1D1C21" className="w-7 h-7   xl:w-12 xl:h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              : buttonLabel
          }
        </button>
      </section>

      <section
        style={showWhenVisible}
        className="w-full h-full flex items-start justify-center"
      >
        <div className="mt-36 p-8 w-[400px] bg-[#2E2C33] rounded-2xl flex flex-col items-center justify-center">
          { children }
          <button
            onClick={toggleVisibility}
            className="FontThin text-[#CECCCC] text-sm sm:w-auto text-center"
          >
            Cancel
          </button>
        </div>
      </section>
    </main>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable