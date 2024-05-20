import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import * as yup from 'yup'

function App() {

  const { t, i18n } = useTranslation()

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      content: '',
    },
    validateOnMount: true,
    validationSchema: yup.object({
      name: yup.string().required(t('nameRequired')).min(3, t('nameMinCharacter')).max(10, t('nameMaxCharacter')),
      surname: yup.string().required(t('surnameRequired')),
      email: yup.string().email(t('emailInvalid')).required(t('emailRequired')),
      phone: yup.number().typeError(t('phoneInvalid')).required(t('phoneRequired')),
      content: yup.string().required(t('contentRequired'))
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');
    setTimeout(() => {
      formik.validateForm();
    }, 0);
  };

  return (
    <div className="container mx-auto mt-5">
      <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-300" role="alert">
        <span class="font-medium">{t('success')}!</span> {t('successText').replace('{{phone}}', formik.values.phone)}
      </div>
      <div className="flex gap-20">
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-4 max-w-[600px] mx-auto bg-white border border-slate-300 p-8 box-border rounded-md">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-700 font-medium">{t('name')}</span>
            <input
              placeholder={t('name')}
              className="border border-slate-300 px-4 h-[45px] rounded-md"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && <span className="text-xs text-red-500">{formik.errors.name}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-700 font-medium">{t('surname')}</span>
            <input
              placeholder={t('surname')}
              className="border border-slate-300 px-4 h-[45px] rounded-md"
              {...formik.getFieldProps('surname')}
            />
            {formik.touched.surname && formik.errors.surname && <span className="text-xs text-red-500">{formik.errors.surname}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-700 font-medium">{t('email')}</span>
            <input
              placeholder={t('email')}
              className="border border-slate-300 px-4 h-[45px] rounded-md"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <span className="text-xs text-red-500">{formik.errors.email}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-slate-700 font-medium">{t('phone')}</span>
            <input
              placeholder={t('phone')}
              className="border border-slate-300 px-4 h-[45px] rounded-md"
              {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && <span className="text-xs text-red-500">{formik.errors.phone}</span>}
          </div>

          <div className="flex flex-col col-span-2 gap-1">
            <span className="text-sm text-slate-700 font-medium">{t('content')}</span>
            <textarea
              placeholder={t('content')}
              className="border border-slate-300 min-h-[200px] rounded-md px-4 h-[45px]"
              {...formik.getFieldProps('content')}
            />
            {formik.touched.content && formik.errors.content && <span className="text-xs text-red-500">{formik.errors.content}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <button type="submit"
            disabled={!(formik.isValid && formik.dirty)}
              className="bg-purple-400 hover:bg-purple-500 text-white text-sm px-4 py-2 h-[50px] rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {t('send')}
            </button>
            {!(formik.isValid && formik.dirty) && <span className="text-xs text-red-500">{t('sendError')}</span>}
          </div>

          <button
            onClick={toggleLanguage}
            type="button"
            className="bg-sky-400 hover:bg-sky-500 text-white text-sm px-4 py-2 h-[50px] rounded-md font-medium">
            {t('language')}
          </button>
        </form>
        <div className="flex-1 bg-white border border-slate-300 p-4 box-border text-xs">
          <pre>
            <code>
              {JSON.stringify(formik, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
