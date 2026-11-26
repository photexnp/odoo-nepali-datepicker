from odoo.tests import HttpCase, new_test_user, tagged


@tagged('post_install', '-at_install')
class TestCalendarSystem(HttpCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.user = new_test_user(cls.env, login='bs_user', password='bs_user_password')

    def test_default_is_gregorian(self):
        self.assertEqual(self.user.calendar_system, 'gregorian')

    def test_session_info_follows_user_preference(self):
        self.authenticate('bs_user', 'bs_user_password')
        info = self.make_jsonrpc_request('/web/session/get_session_info')
        self.assertEqual(info['calendar_system'], 'gregorian')

        self.user.calendar_system = 'bikram_sambat'
        info = self.make_jsonrpc_request('/web/session/get_session_info')
        self.assertEqual(info['calendar_system'], 'bikram_sambat')

    def test_user_can_set_own_preference(self):
        self.user.with_user(self.user).write({'calendar_system': 'bikram_sambat'})
        self.assertEqual(self.user.calendar_system, 'bikram_sambat')
