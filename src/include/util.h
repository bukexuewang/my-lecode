#pragma once

// ��̬������ɫ��
// @param type ��ɫ������, ͨ����GL_VERTEX_SHADER��GL_FRAGMENT_SHADER
// @param source
// @return ��������ɫ��ID, 0��ʾ����ʧ��
unsigned int createShader(GLenum type, const char* source);
