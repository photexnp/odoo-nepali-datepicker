from odoo import fields, models


class ResUsers(models.Model):
    _inherit = 'res.users'

    calendar_system = fields.Selection(
        selection=[
            ('gregorian', "Gregorian (AD)"),
            ('bikram_sambat', "Nepali (Bikram Sambat)"),
        ],
        string="Date Calendar",
        default='gregorian',
        required=True,
        user_writeable=True,
        help="Calendar used to show and enter dates in the web client. "
             "Dates are always stored in the Gregorian calendar.",
    )
