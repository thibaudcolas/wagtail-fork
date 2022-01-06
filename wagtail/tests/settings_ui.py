from .settings import *  # noqa


# Settings meant to run the test suite with Django’s development server, for integration tests.
DEBUG = True

DATABASES['default']['NAME'] = 'ui_tests.db'  # noqa

WAGTAIL_EXPERIMENTAL_FEATURES = {'slim-sidebar'}

ALLOWED_HOSTS = ['*']

WAGTAIL_I18N_ENABLED = True

WAGTAIL_CONTENT_LANGUAGES = LANGUAGES = [
    ("en-us", "English"),
    ("fr", "French"),
]
