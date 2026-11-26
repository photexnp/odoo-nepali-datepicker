{
    'name': "Nepali Date Picker (Bikram Sambat)",
    'version': '20.0.1.0.0',
    'category': 'Productivity',
    'summary': "Show, type and pick dates in the Nepali Bikram Sambat (BS) calendar",
    'description': """
Lets each user pick the Nepali (Bikram Sambat) calendar in their preferences.
The web client then shows dates, and the date picker, in Bikram Sambat (1970-2090 BS),
while dates are still stored in the Gregorian calendar.
""",
    'author': "Subash Niraula",
    'website': "https://github.com/photexnp/odoo-nepali-datepicker",
    'depends': ['web'],
    'data': [
        'views/res_users_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'nepali_datepicker/static/src/**/*',
        ],
        'web.assets_unit_tests': [
            'nepali_datepicker/static/tests/**/*',
        ],
    },
    'images': ['static/description/banner.png'],
    'license': 'LGPL-3',
}
