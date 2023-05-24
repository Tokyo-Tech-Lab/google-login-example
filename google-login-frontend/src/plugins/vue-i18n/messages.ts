import { common as commonVi } from '../../common/locale/vi/common.vi';
import { common as commonEn } from '../../common/locale/en/common.en';
import { app as appVi } from '../../common/locale/vi/app.vi';
import { app as appEn } from '../../common/locale/en/app.en';
import auth from '../../features/auth/locale';
import error from '@/features/errors/locale';

const messages = {
    vi: {
        app: appVi,
        common: commonVi,
        auth: auth.vi,
        error: error.vi,
    },
    en: {
        app: appEn,
        common: commonEn,
        auth: auth.en,
        error: error.en,
    },
};

export default messages;
